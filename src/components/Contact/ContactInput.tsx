/**
 * ContactInput is a resuable input field component for the ContactForm. 
 * @param id - The unique identifier and `id` for the input element
 * @param placeholder - The text inside the input fields to display
 * @param type - HTML input type (e.g., text, email). Defaults to `text`
 */
type Props = {
    id: string,
    placeholder: string,
    type?: string 
}

export default function ContactInput({ id, placeholder, type="text" }: Props) {
    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-[#58cbf7]"
        />
    ); 
}