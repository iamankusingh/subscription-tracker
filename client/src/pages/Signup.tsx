const Signup = () => {
  return (
    <main>
      <form action="#">
        <div>
          <label htmlFor="">Name</label>
          <input type="text" />
        </div>

        <div>
          <label htmlFor="">Email</label>
          <input type="email" />
        </div>

        <div>
          <label htmlFor="">Password</label>
          <input type="password" />
        </div>

        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
    </main>
  );
};

export default Signup;
