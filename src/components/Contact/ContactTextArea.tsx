/**
 * ContactTextArea is a resusable text area field component for the ContactForm.
 * @param id - The unique identifier and `id` for the text area. 
 * @param placeholder - The text inside the text area fields to display
 */

type Props = {
    id: string,
    placeholder: string,
};

export default function ContactTextArea({ id, placeholder }: Props) {
    return (
        <textarea 
            id={id}
            placeholder={placeholder}
            rows={5}
            className="w-full border border-gray-300 rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-[#58cbf7]"
        />
    )
}