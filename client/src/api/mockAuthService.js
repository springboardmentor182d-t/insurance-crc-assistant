// Use this to demo UI without a backend.
export async function login(email,password){
  await new Promise(r=>setTimeout(r,500));
  if((email==='admin@x.com' && password==='admin123') || (email==='user@x.com' && password==='user123')){
    return { accessToken:'mock', refreshToken:'mock', user:{ id:'1', name: email.includes('admin') ? 'Admin' : 'User', email, role: email.includes('admin') ? 'admin' : 'user' } };
  }
  const e = new Error('Invalid credentials'); e.status=401; throw e;
}
export async function register(data){ await new Promise(r=>setTimeout(r,500)); return { message:'OTP sent to email' }; }
export async function forgotPassword(email){ await new Promise(r=>setTimeout(r,500)); return { message:'OTP sent to email' }; }
export async function verifyOTP(email,otp){ await new Promise(r=>setTimeout(r,500)); if(otp==='123456') return { accessToken:'mock', refreshToken:'mock', user:{ id:'1', name:'User', email, role:'user' } }; const e = new Error('Invalid OTP'); e.status=400; throw e; }
export function getOAuth2Url(){ return '/'; }
