const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col gap-y-4'>
      <nav className='w-full bg-slate-400'>Auth Navbar</nav>
      {children}
    </div>
  );
};

export default AuthLayout;
