import yargs from 'yargs';

const args = yargs
  .alias({
    p: 'production',
    t: 'testing',
    w: 'watch',
  })
  .argv;

export default args;
