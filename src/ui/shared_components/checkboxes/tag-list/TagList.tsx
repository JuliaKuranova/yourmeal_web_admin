import "./TagList.css";

interface TagListProps {
  onChange: (value: string) => void;
  checked: boolean;
  id: number;
  value: string;
}

const TagList = (props: TagListProps) => {
  return (
    <div className="checkbox-wrapper-10">
      <input
        className="tgl tgl-flip"
        id={props.id.toString()}
        type="checkbox"
        checked={props.checked}
        onChange={event => props.onChange(event.target.value)}
        value={props.value}
      />
      <label
        className="tgl-btn"
        data-tg-off={props.value}
        data-tg-on={props.value}
        htmlFor={props.id.toString()}
      ></label>
    </div>
  );
};

export default TagList;
