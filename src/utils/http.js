

// const fetchLogin = async ({ signal }) => {

//   const response = await fetch('http://localhost:8888/login')

//   if (!response.ok) {
//     const error = new Error('An error occurred while fetching the events');
//     error.code = response.status;
//     error.info = await response.json();
//     throw error;
//   }


//   const { body } = await response.json();

//   console.log(body);
//   return body;
// }

// export { fetchLogin }