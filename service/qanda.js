const crdt = require("cloudstate").crdt;

const entity = new crdt.Crdt(
  "qanda.proto",
  "cloudstate.samples.qanda.Qanda"
);

entity.defaultValue = () => new crdt.ORMap();

function ask(req, ctx) {
  if (!ctx.state.has(req.question)) {
    ctx.state.set(req.question, new crdt.GCounter());
  }
  ctx.state.get(req.question).increment(1);
  return {};
}

function copyQuestions(map) {
  const questions = {};
  map.forEach((counter, question) => {
    questions[question] = counter.value;
  });
  return questions;
}

function updateAndDiffQuestions(questions, map) {
  const updated = {};
  map.forEach((counter, question) => {
    if (questions[question] === undefined || questions[question] !== counter.value) {
      questions[question] = counter.value;
      updated[question] = counter.value;
    }
  });
  return updated;
}

function watch(req, ctx) {
  const questions = copyQuestions(ctx.state);
  ctx.onStateChange = state => {
    const updated = updateAndDiffQuestions(questions, state);
    if (Object.keys(updated).length > 0) {
      return {
        questions: updated
      };
    }
  };
  return {
    questions: questions
  };
}

entity.commandHandlers = {
  Ask: ask,
  Watch: watch
};

entity.start();
