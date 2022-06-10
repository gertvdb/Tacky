#!/usr/bin/env node
const yargs = require('yargs/yargs')
const prompts = require('prompts');

const { hideBin } = require('yargs/helpers')

const chalk = require('chalk')
const fs = require("fs");
const appRootPath = require("app-root-path");
const path = require("path");
const prettier = require("prettier");
const structure = require('./structure');
const appConfig = require('./config').read();
const defaultConfig = require("./defaultConfig");
const { spawn } = require('child_process');
const log = console.log;

const nodemon = require('nodemon');

// Init
yargs(hideBin(process.argv))
    .command(
        'init',
        'initialize a tacky styleguide setup',
        (yargs) => {
            return yargs
        }, (argv) => {

            const questions = [
                {
                    type: 'text',
                    name: 'project',
                    message: 'What is the name of your project?',
                    initial: 'My Project',
                },
                {
                    type: 'text',
                    name: 'author',
                    message: 'Who is the owner of the project?',
                    initial: 'Tacky',
                }
            ];

            (async () => {
                const response = await prompts(questions);

                let buildConfig = defaultConfig;
                buildConfig.project = response.project;
                buildConfig.author = response.author;

                fs.writeFileSync(
                    path.join(appRootPath.toString(), '/tacky.config.js'),
                    `module.exports = ${prettier.format(JSON.stringify(buildConfig, null, '\t') ,{ semi: false, parser: "json" })};`,
                    'utf8'
                );

                structure.create();

                log(chalk('\n'));
                log(chalk.bgGreenBright('Success'));
                log(chalk('The tacky.config.js was generated. Run `tacky serve` to view your project.'));
                log(chalk('\n'));

            })();
        })
    .parse()

// Serve
yargs(hideBin(process.argv))
    .command(
        'serve',
        'serve the styleguide',
        (yargs) => {
            return yargs
        }, (argv) => {

            const process = require('child_process');
            const app = process.spawn('nodemon', ['./src/server.js', '--watch', path.join(appRootPath.toString(), appConfig.entry.path), '-e', 'js,css,njk'], {
                stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
            });

            app.on('message', function (event) {
                console.log(event.type);
                if (event.type === 'start') {
                    console.log('nodemon started');
                } else if (event.type === 'crash') {
                    console.log('script crashed for some reason');
                }
            });


            if (Object.keys(appConfig).length === 0) {
                log(chalk('\n'));
                log(chalk.bgRedBright('Error'));
                log(chalk('Could not serve your app due to a missing configuration file.'));
                log(chalk('Did you ran tacky init.'));
                log(chalk('\n'));
            } else {

            }


            log(chalk('\n'));
            log(chalk.bgGreenBright('Serving'));
            log(chalk('Starting the development server you can view your app at http://localhost:3000.'));
            log(chalk('\n'));
        })
    .parse()

// Build
yargs(hideBin(process.argv))
    .command(
        'build',
        'build the dist folder the styleguide',
        (yargs) => {
            return yargs
        }, (argv) => {
            log(chalk('\n'));
            log(chalk.bgGreenBright('Build'));
        })
    .parse()

// Build
yargs(hideBin(process.argv))
    .command(
        'release',
        'release a new version of the styleguide',
        (yargs) => {
            return yargs
        }, (argv) => {

            // Run Build process
            // - run stylelint ??
            // - compile css
            // - export variables in js-file
            // - build static styleguide

            const exec = require('child_process').exec;
            if (argv.major) {
                exec('npm version major', (err, stdout) => {
                    console.log('major -' + stdout);
                });
                return;
            }

            if (argv.minor) {

                exec('npm version minor', (err, stdout) => {
                    console.log('minor -' + stdout);
                });
                return;
            }

            exec('npm version patch', (err, stdout) => {
                console.log('patch -' + stdout);
            });

        }).option('major', {
            type: 'boolean',
            description: 'Run with verbose logging'
        })
        .option('minor', {
            type: 'boolean',
            description: 'Run with verbose logging'
        })
        .option('patch', {
            type: 'boolean',
            description: 'Run with verbose logging'
        })
    .parse()