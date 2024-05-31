import { ChangeEvent, useState } from "react";
import PromptButton from "../buttons/prompt_button/PromptButton";
import ImageUploader from "../inputs/uploader/ImageUploader";
import Prompt from "../prompt/Prompt";
import "./Photo.css";
import { defaultImage } from "../../../assets/constants";

interface PhotoProps {
  id: string;
  promptSubtitle: string;
  //   img: JSX.Element;
  img: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Photo = (props: PhotoProps) => {
  const [isPromptOpen5, setPromptOpen5] = useState(false);

  return (
    <>
      <div className="order__title">
        <span>Фотография</span>
        <PromptButton onClick={() => setPromptOpen5(true)} />
        <Prompt
          isOpen={isPromptOpen5}
          onClose={() => setPromptOpen5(false)}
          title={"Фотография"}
          subtitle={props.promptSubtitle}
        />
      </div>

      <div className="wrapper-photo">
        <img src={props.img} />

        <div className="btn-w-right">
          <ImageUploader
            onChange={props.onChange}
            isImageLoaded={false}
            onSubmit={() => {}}
            label={
              defaultImage === props.img ? "Загрузить фото" : "Изменить фото"
            }
            displayIcon={defaultImage !== props.img}
          />
        </div>
      </div>
    </>
  );
};

export default Photo;
