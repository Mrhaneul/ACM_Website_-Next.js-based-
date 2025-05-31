import ContactInput from "./ContactInput";
import ContactTextArea from "./ContactTextArea";

/**
 * ContactForm is a form field that renders the ContactInput and ContactTextArea.
 * The form is submitted with a submit button. 
 */
export default function ContactForm() {
    return(
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactInput id="firstName" placeholder="First Name" />
            <ContactInput id="lastName" placeholder="Last Name" />
            <ContactInput id="phone" placeholder="Phone Number" />
            <ContactInput id="email" placeholder="Email" />
            <div className="md:col-span-2">
                <ContactTextArea id="message" placeholder="Leave us a message!" />
            </div>
            <div className="md:col-span-2 text-center">
                <button
                    type="submit"
                    className="w-96 sm:w-[300px] bg-[#004AAD] hover:bg-[#58cbf7] text-white font-semibold py-2 px-4 rounded-[8px] transition"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}