import { ChangeEvent, MouseEvent } from "react";

import FileUploader from "./FileUploader";

interface ImageUploaderProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  isImageLoaded: boolean,
  onSubmit: () => void,
  label: string,
  displayIcon?: boolean,
}

export default function ImageUploader(props: ImageUploaderProps) {
  const onSubmitHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <div className="edit-image">
      <FileUploader label={props.label} onChange={props.onChange} displayIcon={props.displayIcon} />
      {/* {
        props.isImageLoaded
          ? <button onClick={onSubmitHandler}>{props.icon}</button>
          : null
      } */}
    </div>
  );
}