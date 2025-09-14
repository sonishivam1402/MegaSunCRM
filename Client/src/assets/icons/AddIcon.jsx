const AddIcon = ({ size = 12, color = "#0D4715", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.47059 12V6.52941H0V5.47059H5.47059V0H6.52941V5.47059H12V6.52941H6.52941V12H5.47059Z"
      fill={color}
    />
  </svg>
);

export default AddIcon;
