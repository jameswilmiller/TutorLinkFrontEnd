const PLACEHOLDER = ""

const BASE_IMAGE_URL = "http://localhost:8080/images";

export function getTutorImage(tutor) {
    if (!tutor.profileImageKey) {
        return PLACEHOLDER;
    }

    return `${BASE_IMAGE_URL}/${tutor.profileImageKey}`;
}