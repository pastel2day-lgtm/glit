/**
 * 글릿 맞춤 큐레이션 신청 → 구글 스프레드시트 연동 (Google Apps Script)
 *
 * 설정 방법
 * 1. 신청 내역을 쌓을 구글 스프레드시트를 열고, 메뉴에서 [확장 프로그램] → [Apps Script]를 누릅니다.
 * 2. 편집기에 있던 코드를 모두 지우고 이 파일 내용을 붙여 넣은 뒤 저장합니다.
 * 3. [배포] → [새 배포] → 유형 선택(톱니바퀴)에서 [웹 앱]을 고릅니다.
 *    - 다음 사용자 인증 정보로 실행: 나
 *    - 액세스 권한이 있는 사용자: 모든 사용자
 * 4. [배포]를 누르고 권한을 승인합니다. ("확인되지 않은 앱" 경고가 나오면 [고급] → [이동]을 누르세요.)
 * 5. 화면에 나온 웹 앱 URL(https://script.google.com/macros/s/.../exec)을
 *    lib/curationSheet.ts 의 CURATION_SHEET_URL 에 넣고 배포합니다.
 *
 * 시트는 비공개로 두세요. 웹 앱은 신청 한 줄을 추가하는 일만 하고, 시트 내용을 밖으로 보여주지 않습니다.
 */

const SHEET_NAME = '신청'
const HEADERS = ['신청 일시', '이름', '나이', '휴대폰', '결과 유형', '유형별 점수', '개인정보 동의']

function doPost(e) {
  const p = (e && e.parameter) || {}

  // 사람 눈에 보이지 않는 칸이 채워져 있으면 스팸 봇으로 보고 저장하지 않습니다.
  if (p['bot-field']) return ContentService.createTextOutput('ok')

  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const sheet = getSheet_()
    sheet.appendRow([
      new Date(),
      clean_(p.name),
      clean_(p.age),
      // 앞자리 0이 사라지지 않도록 글자로 저장합니다.
      "'" + clean_(p.phone),
      clean_(p.grain),
      clean_(p.scores),
      p.privacy ? '동의' : '',
    ])
  } finally {
    lock.releaseLock()
  }
  return ContentService.createTextOutput('ok')
}

function getSheet_() {
  const book = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = book.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME)
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.setFrozenRows(1)
  }
  return sheet
}

// 길이를 제한하고, =·+·-·@ 로 시작하는 값은 수식으로 실행되지 않게 글자로 바꿉니다.
function clean_(value) {
  const text = String(value || '').trim().slice(0, 200)
  return /^[=+\-@]/.test(text) ? "'" + text : text
}
