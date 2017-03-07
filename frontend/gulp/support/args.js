import yargs from 'yargs';

const args = yargs
  .alias({
    p: 'production',
    t: 'testing',
    w: 'watch',
  })
  .default('uglifyjs', true)
  .argv;

export default args;
