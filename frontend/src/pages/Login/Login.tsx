import React from 'react';
import './Login.style.css';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { Box, Typography } from '@mui/material';

import { useAppDispatch } from '../../hooks/useRedux';
import {
  authenticateGoogleThunk,
  // authenticateThunk,
} from '../../redux/user/actions';
// import ShiaiIcon from '../../components/ShiaiIcon';

const Login: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const googleLogin = async (
    response: GoogleLoginResponseOffline | GoogleLoginResponse,
  ) => {
    dispatch(authenticateGoogleThunk(response));
  };

  // const manualLogin = async (e: React.FormEvent) => {
  //   if (email !== '' && password !== '') {
  //     e.preventDefault();
  //     dispatch(authenticateThunk({ username: email, password }));
  //   }
  // };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4">Welcome to Shiai.eu</Typography>

      <GoogleLogin
        clientId="419512979795-dsnk4e3rlic7c7f4hh678q6qtlqv59go.apps.googleusercontent.com"
        render={(props) => (
          <button
            type="button"
            onClick={props.onClick}
            className="login-with-google-btn"
          >
            Sign in with Google
          </button>
        )}
        onSuccess={googleLogin}
        onFailure={googleLogin}
        buttonText="Login with Google"
        cookiePolicy="single_host_origin"
      />
    </Box>
  );
  /*
  return (
    <div className="sm:bg-gray-200 w-full flex flex-col justify-center items-center">
      <div className=" shadow-none sm:shadow-lg px-8 sm:px-12 w-full xs:w-full sm:w-8/12 md:w-7/12 lg:w-7/12 xl:w-2/6 sm:h-auto py-8">
        <div className="text-center w-full font-bold text-3xl text-gray-600 p-4">
          LOGIN TO SHIAI.EU
        </div>
        <div className="w-full bg-gray-200 my-3" style={{ height: '1px' }} />
        <form onSubmit={manualLogin}>
          <div className="flex flex-col gap-4 px-0 py-4">
            <div>
              <label className="text-gray-700">Email address</label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="py-2 pl-10 border border-gray-200 w-full"
                placeholder="Email address"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-700">Password</label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-11"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                className="py-2 pl-10 border border-gray-200 w-full"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-row gap-2">
              <button
                className="border border-indigo-500 hover:bg-green-500 hover:text-white duration-100 ease-in-out w-6/12 text-indigo-500 p-0 flex flex-row justify-center items-center gap-1"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/register');
                }}
                className="border border-indigo-500 hover:bg-blue-500 hover:text-white duration-100 ease-in-out w-6/12 text-indigo-500 p-2 flex flex-row justify-center items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Sign-up
              </button>
            </div>
            <div className="my-2 flex flex-row justify-center">
              <span className="absolute bg-white px-4">or</span>
              <div
                className="w-full bg-gray-200 mt-3"
                style={{ height: '1px' }}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <GoogleLogin
                clientId="419512979795-dsnk4e3rlic7c7f4hh678q6qtlqv59go.apps.googleusercontent.com"
                render={(props) => (
                  <button
                    onClick={props.onClick}
                    className="bg-red-500 text-white w-full p-2 flex flex-row justify-center gap-2 items-center hover:bg-red-600 duration-100 ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="w-5"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    Sign-in with Google
                  </button>
                )}
                onSuccess={googleLogin}
                onFailure={googleLogin}
                buttonText="Login with Google"
                cookiePolicy="single_host_origin"
              />
            </div>
            <div className="w-full flex flex-row justify-end">
              <a href="#">Forgot password</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  ); */
};

export default Login;
