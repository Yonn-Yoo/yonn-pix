import { useEffect, useState } from 'react';
import { emailRegex, passwordRegex } from '../src/constants/regex';
import { registerInfoType } from '../src/types/reqBody';

export default function SignUp() {
  const [passwordValidationPhrase, setPasswordValidationPhrase] = useState('');
  const [registerInfo, setRegisterInfo] = useState<registerInfoType>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    const { password } = registerInfo;
    if (password.length < 8) {
      setPasswordValidationPhrase('At least 8 characters required');
    } else {
      setPasswordValidationPhrase(
        'Numeric and special characters (!,@,#,$,^,*,-) must be contained'
      );
    }
  }, [registerInfo.password]);

  const handleOnChange = (value: string | null, key: string) => {
    setRegisterInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isFormCompleted = () => {
    const { email, password, firstName, lastName } = registerInfo;

    return !email ||
      !password ||
      !firstName ||
      !lastName ||
      !isEmailValid() ||
      !isPasswordSame()
      ? false
      : true;
  };

  const isEmailValid = () => {
    return emailRegex.test(registerInfo.email) ? true : false;
  };

  const isPasswordValid = () => {
    return passwordRegex.test(registerInfo.password) ? true : false;
  };

  const isPasswordSame = () => {
    const { password, confirmPassword } = registerInfo;
    return password === confirmPassword ? true : false;
  };

  return (
    <>
      <div
        className="fixed inset-0 w-screen h-screen bg-cover bg-center -z-10 opacity-80 max-sm:hidden"
        style={{ backgroundImage: 'url(/blue-blur.jpg)' }}
      />
      <section>
        <h1 className="text-xl md:text-3xl text-blue-600 mb-10 md:mb-14 text-center">
          Create your account
        </h1>
        <div className="max-w-xl mx-auto p-0 md:p-8 rounded-xl bg-white/70 backdrop-blur-2xl">
          <div className="relative z-0 w-full mb-6 md:mb-8 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              onChange={(e) => handleOnChange(e.target.value, 'email')}
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 ${
                isEmailValid() || !registerInfo.email
                  ? 'focus:border-blue-600'
                  : '!border-rose-400'
              } ${
                isEmailValid() && 'border-green-500 focus:border-green-500'
              } peer`}
              placeholder=" "
            />
            <p
              className={`absolute -bottom-5 ${
                isEmailValid() || !registerInfo.email ? 'invisible' : 'visible'
              } text-rose-600 text-xs`}
            >
              Please provide a valid email address.
            </p>
            <label
              htmlFor="floating_email"
              className={`peer-focus:font-medium absolute text-sm text-gray-500 duration-200 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                isEmailValid() || !registerInfo.email
                  ? 'peer-focus:text-blue-600'
                  : '!text-rose-600'
              } ${
                isEmailValid() && 'text-green-500 peer-focus:text-green-500'
              } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 md:mb-8 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              maxLength={16}
              onChange={(e) => handleOnChange(e.target.value, 'password')}
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 ${
                isPasswordValid() || !registerInfo.password
                  ? 'focus:border-blue-600'
                  : '!border-rose-400'
              } ${
                isPasswordValid() && 'border-green-500 focus:border-green-500'
              } peer`}
              placeholder=" "
            />
            <p
              className={`absolute -bottom-5 ${
                isPasswordValid() || !registerInfo.password
                  ? 'invisible'
                  : 'visible'
              } text-rose-600 text-xs`}
            >
              {passwordValidationPhrase}
            </p>
            <label
              htmlFor="floating_password"
              className={`peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                isPasswordValid() || !registerInfo.password
                  ? 'peer-focus:text-blue-600'
                  : '!text-rose-600'
              } ${
                isPasswordValid() && 'text-green-500 peer-focus:text-green-500'
              }`}
            >
              Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 md:mb-8 group">
            <input
              type="password"
              name="repeat_password"
              id="floating_repeat_password"
              maxLength={16}
              onChange={(e) =>
                handleOnChange(e.target.value, 'confirmPassword')
              }
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer ${
                isPasswordSame() || !registerInfo.confirmPassword
                  ? 'focus:border-blue-600'
                  : '!border-rose-400'
              } ${
                isPasswordSame() &&
                registerInfo.confirmPassword &&
                'border-green-500 focus:border-green-500'
              }`}
              placeholder=" "
            />
            <p
              className={`absolute -bottom-5 ${
                isPasswordSame() || !registerInfo.confirmPassword
                  ? 'invisible'
                  : 'visible'
              } text-rose-600 text-xs`}
            >
              Please check your password
            </p>
            <label
              htmlFor="floating_repeat_password"
              className={`peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                isPasswordSame() || !registerInfo.confirmPassword
                  ? 'peer-focus:text-blue-600'
                  : '!text-rose-600'
              } ${
                isPasswordSame() &&
                registerInfo.confirmPassword &&
                'text-green-500 peer-focus:text-green-500'
              }`}
            >
              Confirm password
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 md:mb-8 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                onChange={(e) => handleOnChange(e.target.value, 'firstName')}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 md:mb-8 group">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                onChange={(e) => handleOnChange(e.target.value, 'lastName')}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>

          <button
            disabled={!isFormCompleted()}
            className={`text-white focus:outline-none font-semibold rounded-lg text-sm w-full px-5 py-2.5 duration-200 ease-out ${
              isFormCompleted()
                ? 'bg-blue-700 hover:bg-blue-800'
                : 'cursor-not-allowed bg-zinc-300'
            }`}
          >
            Sign Up
          </button>
        </div>
      </section>
    </>
  );
}
