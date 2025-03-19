import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    //we can't use onClick bcz we are in server component so instead this we do form and use actions
    <form action={signInAction}>
      <button className="flex items-center gap-6 px-10 py-4 text-lg font-medium border border-primary-300">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
