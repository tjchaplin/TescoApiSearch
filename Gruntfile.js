var secrets = require('./secrets.json');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        scp: {
            production: {
                options: {
                  host: secrets.production.host,
                  username: secrets.production.username,
                  password: secrets.production.password
                },
                files: [{
                    cwd: 'views',
                    src: '**/*',
                    filter: 'isFile',
                    // path on the server
                    dest: '/var/web/<%= pkg.name %>/views'
                },{
                    cwd: 'routes',
                    src: '**/*',
                    filter: 'isFile',
                    // path on the server
                    dest: '/var/web/<%= pkg.name %>/routes'
                },
                {
                    cwd: 'public',
                    src: '**/*',
                    filter: 'isFile',
                    // path on the server
                    dest: '/var/web/<%= pkg.name %>/public'
                },
                {
                    cwd: 'lib',
                    src: '**/*',
                    filter: 'isFile',
                    // path on the server
                    dest: '/var/web/<%= pkg.name %>/lib'
                },
                {
                    cwd: '.',
                    src: '*',
                    filter: 'isFile',
                    // path on the server
                    dest: '/var/web/<%= pkg.name %>/'
                }]
            },
            development: {
                options: {
                  host: secrets.development.host,
                  username: secrets.development.username,
                  password: secrets.development.password
                },
                files: [{
                    cwd: 'views',
                    src: '**/*',
                    filter: 'isFile',
                    // path on the server
                    dest: '/var/web/<%= pkg.name %>/views'
                },{
                    cwd: 'routes',
                    src: '**/*',
                    filter: 'isFile',
                    // path on the server
                    dest: '/var/web/<%= pkg.name %>/routes'
                },
                {
                    cwd: 'public',
                    src: '**/*',
                    filter: 'isFile',
                    // path on the server
                    dest: '/var/web/<%= pkg.name %>/public'
                },
                {
                    cwd: 'lib',
                    src: '**/*',
                    filter: 'isFile',
                    // path on the server
                    dest: '/var/web/<%= pkg.name %>/lib'
                },
                {
                    cwd: '.',
                    src: '*',
                    filter: 'isFile',
                    // path on the server
                    dest: '/var/web/<%= pkg.name %>/'
                }]
            },
          },
        sshexec: {
            stopProductionApp: {
                options: {
                  host: secrets.production.host,
                  username: secrets.production.username,
                  password: secrets.production.password
                },
                command: "ps auxwwwe | egrep ' [n]ode' | grep '<%= pkg.name %>' | awk '{print $2 }'| xargs kill &> /dev/null"
            },
            stopDevelopmentApp: {
                options: {
                  host: secrets.development.host,
                  username: secrets.development.username,
                  password: secrets.development.password
                },
                command: "ps auxwwwe | egrep ' [n]ode' | grep '<%= pkg.name %>' | awk '{print $2 }'| xargs kill &> /dev/null"
            },
            startProductionApp: {
                command: 'nohup node /var/web/<%= pkg.name %>/app > /dev/null 2>&1 &',
                options: {
                  host: secrets.production.host,
                  username: secrets.production.username,
                  password: secrets.production.password
                }
            },
            startDevelopmentApp: {
                command: 'nohup node /var/web/<%= pkg.name %>/app > /dev/null 2>&1 &',
                options: {
                  host: secrets.development.host,
                  username: secrets.development.username,
                  password: secrets.development.password
                }
            },
            installProductionApp: {
                command: 'cd /var/web/<%= pkg.name %> && npm install .',
                options: {
                  host: secrets.production.host,
                  username: secrets.production.username,
                  password: secrets.production.password
                }
            },
            installDevelopmentApp: {
                command: 'cd /var/web/<%= pkg.name %> && npm install .',
                options: {
                  host: secrets.development.host,
                  username: secrets.development.username,
                  password: secrets.development.password
                }
            },
            removeProductionApp: {
                command: 'rm -rf /var/web/<%= pkg.name %>',
                options: {
                  host: secrets.production.host,
                  username: secrets.production.username,
                  password: secrets.production.password
                }
            },
            removeDevelopmentApp: {
                command: 'rm -rf /var/web/<%= pkg.name %>',
                options: {
                  host: secrets.development.host,
                  username: secrets.development.username,
                  password: secrets.development.password
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-scp');
    grunt.loadNpmTasks('grunt-ssh');

    grunt.registerTask('devDeploy', ['sshexec:stopDevelopmentApp','sshexec:removeDevelopmentApp','scp:development','sshexec:installDevelopmentApp','sshexec:startDevelopmentApp']);
    grunt.registerTask('prodDeploy', ['sshexec:stopProductionApp','sshexec:removeProductionApp','scp:production','sshexec:installProductionApp','sshexec:startProductionApp']);
};
