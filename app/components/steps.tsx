import Link from "next/link";

function Steps() {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start space-y-16 md:space-y-0 justify-center py-20 min-h-[60vh] mt-20 px-32 md:px-16 bg-secant2 w-full md:space-x-16 text-main">
      <div className="flex flex-col items-center justify-between md:w-1/3 ">
        <span className="rounded-full bg-gradient-to-br from-secant to-secant3 w-8 h-8 text-center flex items-center justify-center">
          1
        </span>
        <h1 className="flex flex-col items-center justify-center text-lg text-center my-4 w-full font-bold">
          <span>Start by chosing a Template</span>
        </h1>
        <p className="text-center">
          Our professional resume templates are designed in strict accordance
          with industry standards and best practices.
        </p>
        <Link
          href={"/Creator"}
          className=" h-10 bg-gradient-to-br p-4 from-secant flex items-center justify-center to-secant2 mt-10 rounded-full text-main"
        >
          Chose a template
        </Link>
      </div>
      <div className="flex flex-col items-center justify-between md:w-1/3 ">
        <span className="rounded-full bg-gradient-to-br from-secant to-secant3 w-8 h-8 text-center flex items-center justify-center">
          2
        </span>
        <h1 className="flex flex-col items-center justify-center text-lg my-4 w-full font-bold text-center">
          <span>Edit the template as you want</span>
        </h1>
        <p className="text-center">
          Feel free to edit the template as you wish to tailor it to your
          specific needs and preferences.
        </p>
      </div>
      <div className="flex flex-col items-center justify-between md:w-1/3 ">
        <span className="rounded-full bg-gradient-to-br from-secant to-secant3 w-8 h-8 text-center flex items-center justify-center">
          3
        </span>
        <h1 className="flex flex-col items-center justify-center text-lg my-4 w-full font-bold text-center">
          <span>Submit job applications</span>
          <span>with your resume.</span>
        </h1>
        <p className="text-center">
          Utilize your completed resume to apply for various job opportunities
          and showcase your qualifications and experience to potential
          employers.
        </p>
      </div>
    </section>
  );
}

export default Steps;
