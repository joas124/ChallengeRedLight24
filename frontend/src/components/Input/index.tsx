interface InputProps {
  label: string;
  name: string;
  error: string;
  defaultVal?: string|number;
  type?: string;
}

export default function Input({ label, name, error, defaultVal, type='text'} : InputProps) {

  return (
    <>
      <label>{label}</label>
      {error && <span className="error">{error}</span>}
      <input type={type} name={name} defaultValue={defaultVal} />
    </>
  )
}