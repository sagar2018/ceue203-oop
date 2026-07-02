// =============================================================================
// CEUE203 Object Oriented Programming
// main.js  |  Shared utilities + Google Drive link configuration
// =============================================================================

// ─────────────────────────────────────────────────────────────────────────────
//  GOOGLE DRIVE LINKS
//  ► Change '#' to your actual Google Drive sharing URL for each item.
//  ► Use "Anyone with the link → Viewer" sharing mode in Google Drive.
//  ► If you overwrite the same file in Drive, the URL stays the same —
//    you do NOT need to update these links unless you upload a new file.
// ─────────────────────────────────────────────────────────────────────────────
const DRIVE_LINKS = {

  // ── Course-level documents ──────────────────────────────────────────────
  SYLLABUS:    '#',   // TODO: Full course syllabus (PDF)
  LAB_MANUAL:  '#',   // TODO: Lab manual / general instructions (PDF)

  // ── Lesson Plan handouts (per unit / week) ──────────────────────────────
  LP_U1:  '#',   // Unit 1 Lesson Plan
  LP_U2:  '#',   // Unit 2 Lesson Plan
  LP_U3:  '#',   // Unit 3 Lesson Plan
  LP_U4:  '#',   // Unit 4 Lesson Plan
  LP_U5:  '#',   // Unit 5 Lesson Plan
  LP_U6:  '#',   // Unit 6 Lesson Plan

  // ── Practical handouts ──────────────────────────────────────────────────
  P_W1:   '#',   // Practical  1
  P_W2:   '#',   // Practical  2
  P_W3:   '#',   // Practical  3
  P_W4:   '#',   // Practical  4
  P_W5:   '#',   // Practical  5
  P_W6:   '#',   // Practical  6
  P_W7:   '#',   // Practical  7
  P_W8:   '#',   // Practical  8
  P_W9:   '#',   // Practical  9
  P_W10:  '#',   // Practical 10
  P_W11:  '#',   // Practical 11
  P_W12:  '#',   // Practical 12
  P_W13:  '#',   // Practical 13

  // ── Assignment documents ─────────────────────────────────────────────────
  A_1:    '#',   // Assignment 1
  A_2:    '#',   // Assignment 2
  A_3:    '#',   // Assignment 3
  A_4:    '#',   // Assignment 4
  A_5:    '#',   // Assignment 5
  A_6:    '#',   // Assignment 6
};

// =============================================================================
//  Student / Faculty View Mode
// =============================================================================

function getViewMode() {
  return localStorage.getItem('ceue203_viewMode') || 'student';
}

function setViewMode(mode) {
  localStorage.setItem('ceue203_viewMode', mode);
  applyViewMode();
}

function applyViewMode() {
  const mode = getViewMode();
  const isFaculty = mode === 'faculty';

  document.querySelectorAll('.faculty-only').forEach(el => {
    el.style.display = isFaculty ? '' : 'none';
  });

  document.querySelectorAll('.student-only').forEach(el => {
    el.style.display = isFaculty ? 'none' : '';
  });

  const toggle = document.getElementById('viewModeToggle');
  if (toggle) toggle.checked = isFaculty;

  const label = document.getElementById('viewModeLabel');
  if (label) label.textContent = isFaculty ? 'Faculty View' : 'Student View';
}

// =============================================================================
//  Unit badge helper
//  Unit 1: Intro to OOP             (green)
//  Unit 2: Classes & Objects        (blue)
//  Unit 3: Inheritance              (purple)
//  Unit 4: Polymorphism             (orange)
//  Unit 5: Exception Handling & I/O (amber)
//  Unit 6: Templates & STL          (red)
// =============================================================================
function unitBadgeClass(n) {
  const map = { 1:'unit-1', 2:'unit-2', 3:'unit-3', 4:'unit-4', 5:'unit-5', 6:'unit-6' };
  return map[parseInt(n)] || 'unit-1';
}

// =============================================================================
//  DOM initialisation
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {

  // 1. Apply saved view mode
  applyViewMode();

  // 2. Wire the toggle switch
  const toggle = document.getElementById('viewModeToggle');
  if (toggle) {
    toggle.addEventListener('change', e => {
      setViewMode(e.target.checked ? 'faculty' : 'student');
    });
  }

  // 3. Populate Google Drive links
  document.querySelectorAll('[data-drive-key]').forEach(el => {
    const key = el.getAttribute('data-drive-key');
    const url = DRIVE_LINKS[key];

    if (url && url !== '#') {
      el.href = url;
      el.removeAttribute('tabindex');
      el.classList.remove('disabled');
      el.removeAttribute('aria-disabled');
    } else {
      el.href = '#';
      el.setAttribute('tabindex', '-1');
      el.classList.add('disabled');
      el.setAttribute('aria-disabled', 'true');
      el.setAttribute('title', 'Link not yet published');
    }
  });
});
