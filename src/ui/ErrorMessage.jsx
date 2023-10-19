
const ErrorMessage = ({ error }) => {
  console.error(error)
  return <>
    <div>
      { error ? error.message : 'An error occured'}
    </div>
  </>
};

export default ErrorMessage;