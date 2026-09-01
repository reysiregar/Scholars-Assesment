export const DEFAULT_WHATSAPP_NUMBER = "6285179986368";

export function sanitizePhoneNumber(phone) {
  if (!phone) return DEFAULT_WHATSAPP_NUMBER;
  let cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  }
  return cleaned.length >= 8 ? cleaned : DEFAULT_WHATSAPP_NUMBER;
}

export function buildWhatsAppMessage(biodata, result, program) {
  const name = biodata?.fullName || "Calon Siswa";
  const score = result?.score !== undefined ? `${result.score}%` : "N/A";
  const level = result?.level || "Placement Result";
  const programTitle = program?.title || "Program Belajar";
  const target = biodata?.domisiliTarget ? ` (${biodata.domisiliTarget})` : "";

  return (
    `Halo Tim Akademik EduScholar,\n\n` +
    `Perkenalkan, saya *${name}*${target}.\n` +
    `Saya baru saja menyelesaikan Placement Test di EduScholar dengan hasil:\n` +
    `• Level: *${level}*\n` +
    `• Skor: *${score}* (${result?.correctCount || 0}/${result?.totalQuestions || 15} Benar)\n` +
    `• Rekomendasi Program: *${programTitle}*\n\n` +
    `Saya ingin berkonsultasi lebih lanjut mengenai kurikulum, jadwal kelas, dan pendaftaran program tersebut. Mohon informasinya. Terima kasih!`
  );
}

export function getWhatsAppUrl(biodata, result, program, customRecipientNumber = DEFAULT_WHATSAPP_NUMBER) {
  const recipient = sanitizePhoneNumber(customRecipientNumber);
  const message = buildWhatsAppMessage(biodata, result, program);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${recipient}?text=${encodedMessage}`;
}
