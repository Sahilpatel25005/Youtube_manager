import React from "react";

function About() {
  return (
    <>
      <div className="px-16 h-[600px] bg-red-950 text-white">
        <div className="flex justify-center items-center h-full flex-col gap-6">
          <h1 className="text-4xl font-medium ">Hello, My name is Sahil....</h1>
          <p className="text-lg">
            {" "}
            I create this Youtube Mnager website using ReactJs and TailwindCss.
            <p>This website is used to manage your youtube videos and channels.</p>
             <p>In this ebsite you can ADD, UPDATE and DELETE your videos.</p>
             <p>This is
             project base on "CRUD" operation.</p>
          </p>

          <h1 className="text-xl font-medium">
            <span className="text-xl font-medium">Email :</span>{" "}
            sahilptel252005@gmail.com
          </h1>
          <h1 className="text-xl font-medium">
            <span className="text-xl font-medium">Contact :</span> +91
            9999999999
          </h1>
        </div>
      </div>
    </>
  );
}

export default About;
