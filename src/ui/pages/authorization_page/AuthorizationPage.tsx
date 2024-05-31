import "./AuthorizationPage.css";
import React, { useEffect, useMemo, useState } from "react";
import StandardButton, {
  StandardButtonColor,
  StandardButtonIconPosition,
  StandardButtonIconType,
} from "../../shared_components/buttons/standard_button/StandardButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { displayFirstProfileSheet } from "../../../redux/profile_bottom_sheet_reducer/ProfileBottomSheetReducer";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../shared_components/inputs/plain_input/CustomInput";
import CustomCheckBox from "../../shared_components/buttons/checkbox/CustomCheckBox";
import styled from "styled-components";
import { AuthSteps } from "./AuthSteps";
import { loginUser } from "../../../redux/user_info_reducer/UserInfoReducer";
import { MediaQueries } from "../../../assets/constants/enums/MediaQueries";
import {
  CheckUserExistsResponse,
  LoginResponse,
} from "../../../assets/constants/content_types/api/ApiScheme";
import { API_URL, ASSETS_URL } from "../../../env/EnviromentVariablesResolver";
import { RoutePaths } from "../../../assets/constants/enums/RoutePaths";
import { UserInfo } from "../../../assets/constants/content_types/UserInfo";
import Loader from "../../shared_components/loader/Loader";
import Logo from "../../shared_components/logo/Logo";
import HeaderDesktop from "../../shared_components/header/HeaderDesktop";
import { baseUrl } from "../../../assets/constants";
import VerCMS from "../../shared_components/version_cms/VerCMS";

const StyledAuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const StyledSubmitBtnContainer = styled.div<{
  $isMobile?: boolean;
  $twoButtons?: boolean;
}>`
  position: ${(props) => (props?.$isMobile ? "fixed" : "relative")};
  bottom: ${(props) => props?.$isMobile && "80px"};
  right: ${(props) => props?.$isMobile && "16px"};
  left: ${(props) => props?.$isMobile && "16px"};
  display: ${(props) => (props?.$isMobile ? "flex" : "grid")};
  grid-template-columns: ${(props) =>
    !props?.$isMobile && (props?.$twoButtons ? "1fr 1fr" : "1fr")};
  flex-direction: ${(props) => (props?.$isMobile ? "column" : "row")};
  flex-direction: ${(props) => (props?.$isMobile ? "column" : "row")};
  margin-top: ${(props) => !props?.$isMobile && "64px"};
  gap: 8px;
`;

const AuthorizationPage: React.FC = () => {
  //     return (<div>
  //     <div>fkdbvjkdvbk</div>
  // </div>)

  // page actions
  const [authStep, setAuthStep] = useState(AuthSteps.ENTER_EMAIL);
  const [isLoading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ query: MediaQueries.NORMAL_MOBILE });

  // service functions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>();
  const [emailServerError, setEmailServerError] = useState<string>();
  const [passwordServerError, setPasswordServerError] = useState<string>();

  // forms
  const emailForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Обязательное поле")
        .email("Email должен быть в формате example@ya.ru"),
    }),
    onSubmit: () => {
      setLoading(true);
      axios
        .get<CheckUserExistsResponse>(
          `${API_URL}/email-check?email=${emailForm.values.email}`
        )
        .then((response) => {
          if (response?.data?.exists) {
            setAuthStep(AuthSteps.ENTER_EXISTING_PASS);
          } else {
            setAuthStep(AuthSteps.REGISTER_NEW_ACCOUNT);
          }
        })
        .catch((error) => {
          setServerError((error as Error)?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Обязательное поле").email("Введите email"),
      password: Yup.string().required("Обязательное поле"),
    }),
    onSubmit: () => {
      setLoading(true);
      // axios
      //   .get<CheckUserExistsResponse>(
      //     `${baseUrl}/email-check?email=${loginForm.values.email}`
      //   )
      //   .then((response) => {
      axios
        .post<LoginResponse>(
          `${baseUrl}/api/auth/local`,
          {
            identifier: loginForm.values.email,
            password: loginForm.values.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((loginResponse) => {
          axios
            .get<UserInfo>(
              `${baseUrl}/api/get-full-user-info?userId=${loginResponse.data.user.id}`,
              {
                headers: {
                  Authorization: `Bearer ${loginResponse.data.jwt}`,
                },
              }
            )
            .then((response) =>
              dispatch(
                loginUser({
                  ...response.data,
                  image: `${ASSETS_URL}${response.data.image}`,
                })
              )
            )
            .then(() => navigate(RoutePaths.MENU))
            .catch((error) =>
              console.error(`Failed to fetch user info: ${error.message}`)
            );
        })
        .catch(() => {
          setPasswordServerError("Неверный пароль");
          setLoading(false);
        });
      // })
      // .catch((err) => {
      //   setEmailServerError('Неправильный email');
      //   setLoading(false);
      // });
    },
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      password: "",
      repeatedPassword: "",
      rememberMe: true,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Обязательное поле")
        .min(2, "Имя должно быть длиннее 1 символа")
        .max(20, "Имя должно быть короче 30 символов"),
      password: Yup.string()
        .required("Обязательное поле")
        .min(8, "Пароль должен быть длиннее 7 символов")
        .max(20, "Пароль должен быть короче 30 символов")
        .matches(/\d/, "Пароль должен содержать хотя бы 1 цифру.")
        .matches(
          /(?=.*[A-ZА-ЯЁ])/i,
          "Пароль должен содержать хотя бы одну заглавную букву."
        )
        .matches(
          /[!@#$%^&*()_+]/,
          "Пароль должен содержать хотя бы 1 спец. символ"
        ),
      repeatedPassword: Yup.string()
        .required("Обязательное поле")
        .oneOf([Yup.ref("password")], "Пароли не совпадают"),
    }),
    onSubmit: () => {
      setLoading(true);
      axios
        .post<LoginResponse>(`${API_URL}/auth/local/register`, {
          username: registerForm.values.name,
          email: emailForm.values.email,
          password: registerForm.values.password,
          name: registerForm.values.name,
        })
        .then((regResponse) => {
          axios
            .get<UserInfo>(
              `${API_URL}/get-full-user-info?userId=${regResponse.data.user.id}`,
              {
                headers: { Authorization: `Bearer ${regResponse.data.jwt}` },
              }
            )
            .then((response) =>
              dispatch(
                loginUser({
                  ...response.data,
                  image: `${ASSETS_URL}${response.data.image}`,
                })
              )
            )
            .then(() => navigate(RoutePaths.AUTHORIZATION))
            .then(() => dispatch(displayFirstProfileSheet()));
        })
        .catch((error) => {
          setServerError((error as Error)?.message);
          setLoading(false);
        });
    },
  });

  // effects
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.body.classList.add("hidden");
    return () => document.body.classList.remove("hidden");
  }, []);

  useEffect(() => {
    const handleFieldChange = () => {
      setServerError(undefined);
    };

    document.addEventListener("change", handleFieldChange);
    document.addEventListener("blur", handleFieldChange);

    return () => {
      document.removeEventListener("change", handleFieldChange);
      document.removeEventListener("blur", handleFieldChange);
    };
  }, []);

  useEffect(() => {
    emailForm.setTouched({ email: false });
    loginForm.setTouched({ rememberMe: false, password: false });
    registerForm.setTouched({
      name: false,
      password: false,
      rememberMe: false,
      repeatedPassword: false,
    });
    setServerError(undefined);
  }, [authStep]);

  const headerText = useMemo(() => {
    switch (authStep) {
      case AuthSteps.ENTER_EMAIL:
        return "Вход в CMS";
      // case AuthSteps.ENTER_EXISTING_PASS:
      //   return 'Вход'
      case AuthSteps.REGISTER_NEW_ACCOUNT:
        return "Регистрация";
    }
  }, [authStep]);

  const renderEmailForm = () => {
    return (
      <StyledAuthForm onSubmit={loginForm.handleSubmit}>
        <CustomInput
          id={"email"}
          placeholder={"E-mail"}
          material={true}
          value={loginForm.values.email}
          onChange={loginForm.handleChange}
          onBlur={loginForm.handleBlur}
          error={
            loginForm.touched.email && loginForm.errors.email
              ? loginForm.errors.email
              : emailServerError
              ? emailServerError
              : undefined
          }
        />
        <CustomInput
          id={"password"}
          placeholder={"Введите пароль"}
          // password={true}
          type="password"
          material={true}
          value={loginForm.values.password}
          onChange={loginForm.handleChange}
          error={
            loginForm.touched.password && loginForm.errors.password
              ? loginForm.errors.password
              : passwordServerError
              ? passwordServerError
              : undefined
          }
          onBlur={loginForm.handleBlur}
        />
        <CustomCheckBox
          id={"rememberMe"}
          checked={loginForm.values.rememberMe}
          // value={loginForm.values.rememberMe}
          onChange={(newVal: any) =>
            loginForm.setFieldValue("rememberMe", newVal)
          }
          onBlur={loginForm.handleBlur}
          containerStyle={{ marginTop: 8 }}
          text={"Запомнить меня"}
        />
        {renderSubmitButtons(loginForm.handleSubmit)}
      </StyledAuthForm>
    );
  };

  const renderLoginForm = () => {
    return (
      <StyledAuthForm onSubmit={loginForm.handleSubmit}>
        <CustomInput
          id={"password"}
          placeholder={"Пароль"}
          password={true}
          value={loginForm.values.password}
          onChange={loginForm.handleChange}
          error={
            loginForm.touched.password && loginForm.errors.password
              ? loginForm.errors.password
              : serverError
              ? serverError
              : undefined
          }
          onBlur={loginForm.handleBlur}
        />
        <CustomCheckBox
          id={"rememberMe"}
          checked={loginForm.values.rememberMe}
          onChange={(newVal: any) =>
            loginForm.setFieldValue("rememberMe", newVal)
          }
          onBlur={loginForm.handleBlur}
          containerStyle={{ marginTop: 8 }}
          text={"Запомнить меня"}
        />
        {renderSubmitButtons(loginForm.handleSubmit)}
      </StyledAuthForm>
    );
  };

  // const renderRegisterForm = () => {
  //   return (
  //     <StyledAuthForm onSubmit={registerForm.handleSubmit}>
  //       <CustomInput
  //         id={"name"}
  //         placeholder={"Имя"}
  //         material={true}
  //         value={registerForm.values.name}
  //         onChange={registerForm.handleChange}
  //         onBlur={registerForm.handleBlur}
  //         error={
  //           registerForm.touched.name && registerForm.errors.name
  //             ? registerForm.errors.name
  //             : undefined
  //         }
  //       />
  //       <CustomInput
  //         id={"password"}
  //         placeholder={"Пароль"}
  //         password={true}
  //         value={registerForm.values.password}
  //         onChange={registerForm.handleChange}
  //         onBlur={registerForm.handleBlur}
  //         error={
  //           registerForm.touched.password && registerForm.errors.password
  //             ? registerForm.errors.password
  //             : undefined
  //         }
  //       />
  //       <CustomInput
  //         id={"repeatedPassword"}
  //         placeholder={"Повторите пароль"}
  //         password={true}
  //         value={registerForm.values.repeatedPassword}
  //         onChange={registerForm.handleChange}
  //         onBlur={registerForm.handleBlur}
  //         error={
  //           registerForm.touched.repeatedPassword &&
  //           registerForm.errors.repeatedPassword
  //             ? registerForm.errors.repeatedPassword
  //             : undefined
  //         }
  //       />
  //       <CustomCheckBox
  //         id={"rememberMe"}
  //         checked={registerForm.values.rememberMe}
  //         onChange={(newVal: any) =>
  //           registerForm.setFieldValue("rememberMe", newVal)
  //         }
  //         onBlur={registerForm.handleBlur}
  //         text={"Запомнить меня"}
  //         containerStyle={{ marginTop: 8 }}
  //       />
  //       {renderSubmitButtons(registerForm.handleSubmit)}
  //     </StyledAuthForm>
  //   );
  // };

  const renderSubmitButtons = (onCLick: () => void) => {
    return (
      <StyledSubmitBtnContainer
        $isMobile={isMobile}
        $twoButtons={authStep !== AuthSteps.ENTER_EMAIL}
      >
        {authStep !== AuthSteps.ENTER_EMAIL && (
          <StandardButton
            onClickAction={() => setAuthStep(AuthSteps.ENTER_EMAIL)}
            text={"Другой e-mail"}
            color={StandardButtonColor.GRAY}
            iconType={StandardButtonIconType.BLACK_LEFT_ARROW}
            iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
          />
        )}
        <StandardButton
          className="noneDesc"
          type={"submit"}
          onClickAction={onCLick}
          text={"Связаться с техподдержкой"}
          color={StandardButtonColor.GRAY}
          iconType={StandardButtonIconType.NO_ICON}
          iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
        />
        <StandardButton
          type={"submit"}
          onClickAction={onCLick}
          text={"Войти"}
          color={StandardButtonColor.GREEN}
          iconType={StandardButtonIconType.NO_ICON}
          iconPosition={StandardButtonIconPosition.BEFORE_TEXT}
        />
      </StyledSubmitBtnContainer>
    );
  };

  const renderMobile = () => {
    return (
      <div
        className={"auth-and-reg-page-wrapper"}
        style={{ height: window.innerHeight }}
      >
        {isLoading ? (
          <Loader height={"100vh"} />
        ) : (
          <>
            <div className={"main-wrapper"}>
              <Logo />
              <div className={"mobile-h3"}>{headerText}</div>
              <div
                style={{ marginTop: "36px", width: "100%", display: "flex" }}
              >
                {authStep === AuthSteps.ENTER_EMAIL ? (
                  renderEmailForm()
                ) : authStep === AuthSteps.ENTER_EXISTING_PASS ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      width: "100%",
                      flexDirection: "column",
                    }}
                  >
                    {/* <div
                      className={"greetings mobile-main-text"}
                      dangerouslySetInnerHTML={{
                        __html: `Добро пожаловать,<br> ${emailForm.values.email}`,
                      }}
                    /> */}

                    {renderLoginForm()}
                  </div>
                ) : // renderRegisterForm()
                null}
              </div>
              <div className="reg-cms">
                <VerCMS />
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderDesktop = () => {
    return (
      <div
        className={"auth-and-reg-page-wrapper-desktop"}
        style={{ height: window.innerHeight }}
      >
        <HeaderDesktop withBackButton={true} />
        {isLoading ? (
          <div style={{ height: "100vh", display: "flex" }}>
            <Loader />
          </div>
        ) : (
          <div
            className={"auth-and-reg-page-wrapper-desktop-popup"}
            style={{ width: Math.min(784, window.innerWidth / 1.4) }}
          >
            <div className={"header-desktop-wrapper"}>
              <div className={"desktop-h2"}>{headerText}</div>
            </div>
            {authStep === AuthSteps.ENTER_EMAIL ? (
              renderEmailForm()
            ) : authStep === AuthSteps.ENTER_EXISTING_PASS ? (
              <>
                <div className={"desktop-main-text"}>
                  {`Добро пожаловать, ${emailForm.values.email}`}{" "}
                </div>
                {renderLoginForm()}
              </>
            ) : // renderRegisterForm()
            null}
          </div>
        )}
        <div className="reg-cms">
          <VerCMS />
        </div>
      </div>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};

export default AuthorizationPage;
