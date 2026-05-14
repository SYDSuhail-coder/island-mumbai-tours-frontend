import Tours from "@/component/templates/MainPage/Tours";

const Page = async ({ params }) => {

  const { slug } = await params;

  return (
    <div>
      <Tours slug={slug} />
    </div>
  );
};

export default Page;