import yargs from 'yargs';

const args = yargs
  .alias({
    p: 'production',
    t: 'testing',
    w: 'watch',
  })
  .default('uglifyjs', true)
  .default('test', false)
  .argv;

export default args;
