'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useVerifyEmailMutation } from '@/app/features/api';

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const email = searchParams.get('email');

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;
    setOtp(prevOtp => {
      const newOtp = prevOtp.split('');
      newOtp[index] = value;
      return newOtp.join('');
    });
  };

  const handleContinue = async () => {
    if (!email) {
      setError('Email is missing. Please try again.');
      return;
    }

    setError(null); 
    try {
      const response = await verifyEmail({ email, otp }).unwrap();
      
      console.log(response); 

      if (response.success) {
        router.push('/api/auth/components/Landingpage');
      } else {
        setError(response.message || 'The OTP you entered is incorrect. Please try again.');
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      setError('An error occurred while verifying the OTP. Please try again later.');
    }
  };

  return (
    <div className='flex justify-center items-center mt-[120px]'>
      <div className=' w-[400px]'>
        <p className='text-3xl text-center text-[#25324B] mb-8 font-bold'>Verify Email</p>
        <p className='font-light'>
          We've sent a verification code to the email address you provided. To complete the verification process, please enter the code here.
        </p>
        <div className='text-center mt-8 mb-2'>
          {Array.from({ length: 4 }).map((_, index) => (
            <input 
              key={index}
              className="border-purple-500 text-center bg-gray-100 border m-1 w-10 h-10 rounded-md" 
              type="text" 
              maxLength={1} 
              value={otp[index] || ''} 
              onChange={e => handleOtpChange(e, index)} 
            />
          ))}
        </div>
        <p className='font-light text-center'>You can request to <span className='font-normal text-[#4640DE]'>Resend code</span> in</p>
        <p className='text-center text-[#4640DE]'><span>0:30</span></p>
        <div className="text-center mt-5">
          <button className='bg-[#4640DE] text-white w-[300px] h-9 rounded-md' onClick={handleContinue} disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Continue'}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
