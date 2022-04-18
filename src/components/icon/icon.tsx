export function Icon(props: {
    className?: string,
    name: string,
    color: string,
    width: string,
    height: string
}) {
  return (
    <svg className={props.className} width={props.width} height={props.height} fill={props.color}>
      <use href={`${props.name}`} />
    </svg>
  );
}
