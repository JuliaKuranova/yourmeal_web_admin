import { ChangeEvent } from "react";

interface FileUploaderProps {
  label?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fileLoaded?: boolean;
  displayIcon?: boolean;
}

const icon = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
<path d="M15.1734 3.72138L6.09341 12.8013C5.16127 13.7335 4.6952 14.1995 4.34636 14.7424C4.11286 15.1058 3.91927 15.4934 3.76899 15.8984C3.54448 16.5034 3.4518 17.1559 3.26645 18.4611C3.09722 19.6527 3.01261 20.2485 3.23099 20.673C3.37407 20.9511 3.60051 21.1775 3.87863 21.3206C4.30312 21.539 4.89891 21.4544 6.0905 21.2852C7.39565 21.0998 8.04823 21.0071 8.65322 20.7826C9.05819 20.6323 9.44575 20.4387 9.80916 20.2052C10.3521 19.8564 10.8181 19.3903 11.7503 18.4582L20.8302 9.37823C22.3923 7.81613 22.3923 5.28347 20.8302 3.72138C19.2681 2.15928 16.7355 2.15928 15.1734 3.72138Z" stroke="#2C2D2E" stroke-width="2"/>
<path d="M14.5 5L19.5 10" stroke="#2C2D2E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

export default function FileUploader(props: FileUploaderProps) {
  const id = Math.random().toString();

  return (
    <div className="image-uploader animation-02s-all standard-btn-wrapper">
      {props.displayIcon ? icon : ''}
      {props.label ? <label htmlFor={id} className="mobile-and-desktop-btns noselect gray">{props.label}</label> : null}
      <input id={id} type="file" onChange={props.onChange} style={{'display': 'none'}}/>
      {props.fileLoaded ? <span>File loaded</span> : null}
    </div>
  );
}
