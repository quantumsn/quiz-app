import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-white border-t mt-8 px-4 py-2.5">
        <div className="flex justify-between flex-wrap items-center py-4">
          <div className="p-10">
            <Link to="/">
              <h3 className="text-orange-700 text-xl font-bold">Quizentum</h3>
            </Link>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="px-4 py-2.5">
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Follow Us
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link
                    className="hover:text-orange-700"
                    to="https://www.instagram.com/quantum_sn/"
                    target="_blank"
                  >
                    Instagram
                  </Link>
                </li>
                <li>Facebook</li>
              </ul>
            </div>

            <div className="px-4 py-2.5">
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                LEGAL
              </h2>
              <ul className="text-gray-500 font-medium cursor-pointer">
                <li className="mb-4">Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t px-10 py-4">
          <p className=" text-sm text-gray-500">
            &copy; 2024 &nbsp;
            <Link
              className="hover:underline"
              to="https://github.com/quantumsn"
              target="_blank"
            >
              quantumsn
            </Link>
            . All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
