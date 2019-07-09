module.exports = function parseCommit(commit) {
  commit = commit || '';

  const lines = commit.split('\n').filter(line => line[0] !== '#');

  const regex = /^(.*?):\s(.+)/;

  const match = lines[0].match(regex);

  let tag = '';
  let subject = lines[0];
  let feature = '';
  const body = lines.slice(2).join('\n');

  if (match) {
    tag = match[1];
    subject = match[2];
  }

  const subjectParser = /^\((.*?)\)\s*(.*)/;

  const subjectMatch = subject.trim().match(subjectParser);

  if (subjectMatch) {
    feature = subjectMatch[1];
    subject = subjectMatch[2] || subject;
  }

  let empty = false;

  if (lines.length > 0) {
    if (lines.length === 1 && lines[0].length > 0) {
      empty = true;
    }
    if (lines.length > 1) {
      empty = (lines[1] || '').trim() === '';
    }
  }

  if (!tag) {
    if (subject.match(/^Merge/i)) {
      tag = 'MERGE';
    }
    if (subject.match(/^Revert/i)) {
      tag = 'REVERT';
    }
  }

  return {
    originalText: commit,
    emptyLineAfterSubject: empty,
    tag,
    feature,
    subject,
    body,
  };
};
