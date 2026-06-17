import {useState} from "react"
import { useAuth } from "../../hooks/useAuth"
import { updateMeetingLink } from "../../services/bookingService"
import { getOtherParty } from "../../utils/booking"
function BookingDetailOnline({booking, isTutor, canEdit, onSaved}) {
    const {accessToken} = useAuth()
    const [linkInput, setLinkInput] = useState(booking.meetingLink || "")
    const [linkSaving, setLinkSaving] = useState(false)
    const [linkError, setLinkError] = useState("")
   
    const other = getOtherParty(booking, isTutor)

    async function handleSaveLink() {
        setLinkSaving(true)
        setLinkError("")
        try {
            const updated = await updateMeetingLink(booking.id, linkInput, accessToken)
            onSaved(updated)
        } catch (err) {
            setLinkError(err.message || "Failed to save meeting link")
        } finally {
            setLinkSaving(false)
        }
    }
    
    return (booking.meetingLink || canEdit) && (
                    <div className="bg-white border border-tl-border rounded-2xl p-6 mt-6">
                        <p className="text-xs font-semibold tracking-widest text-tl-muted uppercase mb-3">
                            Meeting link
                        </p>
                        {canEdit ? (
                            <>
                                <input
                                    type="text"
                                    value={linkInput}
                                    onChange={e => setLinkInput(e.target.value)}
                                    placeholder="https://zoom.us/j/..."
                                    className="w-full border border-tl-border rounded-xl px-4 py-3 text-sm outline-none focus:border-tl-accent mb-2"
                                />
                                {linkError && <p className="text-sm text-red-500 mb-2">{linkError}</p>}
                                <button
                                    onClick={handleSaveLink}
                                    disabled={linkSaving || linkInput === (booking.meetingLink || "")}
                                    className="px-4 py-2 bg-tl-accent text-white rounded-xl text-sm hover:bg-tl-accent-hover transition disabled:opacity-50 cursor-pointer"
                                >
                                    {linkSaving ? "Saving..." : "Save meeting link"}
                                </button>
                                <p className="text-xs text-tl-muted mt-3">
                                    {other.first} will be emailed when you save.
                                </p>
                            </>
                        ) : booking.meetingLink ? (
                            <a
                                href={booking.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-tl-accent hover:underline break-all"
                            >
                                {booking.meetingLink}
                            </a>
                        ) : (
                            <p className="text-tl-muted text-sm">No meeting link yet.</p>
                        )}
                    </div>
                )
}
export default BookingDetailOnline