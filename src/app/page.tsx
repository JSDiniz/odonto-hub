export default function Home() {
  console.log("DATABASE_URL: ", process.env.DATABASE_URL!);

  return (
    <div>
      <h1 className="">Hello World</h1>
    </div>
  );
}
