const test = require('node:test');
const assert = require('node:assert/strict');

test('navigation reports completion only after finding the destination', async (t) => {
  const { executeAgentAction } = await import('../src/features/assistant/actions.js');
  const selectors = [];
  t.mock.method(global, 'setTimeout', (callback) => { queueMicrotask(callback); return 0; });
  global.document = { querySelector: (selector) => {
    selectors.push(selector);
    return { scrollIntoView() {}, classList: { add() {}, remove() {} } };
  } };
  t.after(() => { delete global.document; });
  let path;
  const result = await executeAgentAction({ type: 'navigate', target: 'projects.pocketpet', label: 'Open PocketPet case study', auto_execute: true }, (value) => { path = value; });
  assert.equal(path, '/projects/pocketpet');
  assert.deepEqual(selectors, ['#case-study-pocketpet']);
  assert.deepEqual(result, { status: 'completed', text: 'Opened PocketPet case study' });
});

test('missing destination reports failure rather than claiming it was highlighted', async (t) => {
  const { executeAgentAction } = await import('../src/features/assistant/actions.js');
  t.mock.method(global, 'setTimeout', (callback) => { queueMicrotask(callback); return 0; });
  global.document = { querySelector: () => null };
  t.after(() => { delete global.document; });
  const result = await executeAgentAction({ type: 'highlight', target: 'projects.syncly', label: 'Highlight Syncly case study', auto_execute: true }, () => {});
  assert.equal(result.status, 'failed');
  assert.match(result.text, /Could not locate Syncly/);
});

test('contact drafts, unknown targets, and malformed walkthroughs cannot auto-execute', async () => {
  const { executeAgentAction, validateAgentAction } = await import('../src/features/assistant/actions.js');
  const navigate = () => { throw new Error('Unsafe navigation'); };
  assert.equal(await executeAgentAction({ type: 'contact', target: 'contact.form', auto_execute: true }, navigate), null);
  assert.equal(validateAgentAction({ type: 'navigate', target: '__proto__' }), null);
  assert.equal(validateAgentAction({ type: 'walkthrough', target: 'projects.aiora', data: {} }), null);
});
