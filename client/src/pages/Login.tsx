const Login: React.FC = () => {
  return (
    <main>
      <form action="#">
        <div>
          <label htmlFor="">Email</label>
          <input type="email" />
        </div>
        
        <div>
          <label htmlFor="">Password</label>
          <input type="password" />
        </div>

        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    </main>
  );
};

export default Login;
