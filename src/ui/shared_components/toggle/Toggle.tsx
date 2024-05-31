import "./Toggle.css";

interface ToggleProps {
  value: boolean;
  onChange: any;
}

const Toggle = (props: ToggleProps) => {
  return (
    <div className="toggle">
      <div className="">
        <input className="input-t" type="checkbox" onChange={props.onChange} checked={props.value} />
      </div>
    </div>
  );
};

export default Toggle;


