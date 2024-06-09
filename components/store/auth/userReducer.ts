const intialState = {
  isSignedIn: true,
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2hpc2h2ZXJtYTE1NTJAZ21haWwuY29tIiwiaWF0IjoxNzE3ODQ1NjAwLCJleHAiOjE3MTc5MzIwMDB9.drT8h5W96lpoAwmr7bJZcIH4ImJYV6FpW7ZWQdGbW7U',
};

export default (state = intialState, {type, payload}) => {
  switch (type) {
    case 'LOGIN':
      return {...state, isSignedIn: payload};

    case 'LOGOUT':
      return {...state, isSignedIn: payload};
  }

  return state;
};
