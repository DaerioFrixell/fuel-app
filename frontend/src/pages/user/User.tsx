export type asdType = {
  a: string
  b: number
}

const Asd = ({ a, b }: asdType) => {
  return a + b;
};

const UserPage = () => {
  const qwe = 123;

  return (
    <>
      <h1>User</h1>
      <p>{qwe}</p>
      <Asd
        a="asd"
        b={123}></Asd>
    </>
  );
};


export default UserPage;