const dockerVersionResponse = {
    Platform: {
        Name: 'string',
    },
    Components: [
        {
            Name: 'Engine',
            Version: '19.03.12',
            Details: {},
        },
    ],
    Version: '19.03.12',
    ApiVersion: '1.40',
    MinAPIVersion: '1.12',
    GitCommit: '48a66213fe',
    GoVersion: 'go1.13.14',
    Os: 'linux',
    Arch: 'amd64',
    KernelVersion: '4.19.76-linuxkit',
    Experimental: true,
    BuildTime: '2020-06-22T15:49:27.000000000+00:00',
};

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getDockerVersion() {
    await timeout(2000);
    return dockerVersionResponse;
}

const mocks = { getDockerVersion };
export { mocks };
