export function Icon(props: {
    className?: string,
    name: string,
    color?: string,
    width: string,
    height: string
    testId?: string
}) {
  return (
    <svg className={props.className} width={props.width} height={props.height} fill={props.color} data-testid={props.testId}>
      <use href={`${props.name}`} />
    </svg>
  );
}
