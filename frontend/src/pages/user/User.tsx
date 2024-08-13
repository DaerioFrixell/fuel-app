export type asdType = {
  a: string
  b: number
}
const Asd = ({ a, b }: asdType) => a + b;

const UserPage = () => {
  const qwe = 123;

  return (
    <>
      <h1>User</h1>
      <p>{qwe}</p>
      <input
        type="text"
        placeholder="asd" />

      <Asd
        a="asd"
        b={123}></Asd>
    </>
  );
};


export default UserPage;