const buildImageRequest = (configuration) => {
    // TODO configure entrypoint and cmd
    const { mountPath, image } = configuration;
    if (!image?.Id) {
        throw new Error(
            'Could not build image request - image is undefined or Id not set'
        );
    }
    const imageSettings = JSON.parse(JSON.stringify(image.Config));
    const HostConfig = {
        PortBindings: {
            '8888/tcp': [
                {
                    HostIp: '127.0.0.1',
                    HostPort: '8888',
                },
            ],
        },
        Mounts: [
            {
                Source: mountPath.pathString,
                Target: `${imageSettings.WorkingDir}/project`, // append project. This is necessary because binding directly to the user directory will override their local bin files.
                Type: 'bind',
            },
        ],
    };
    return { ...imageSettings, HostConfig, Image: image.Id };
};

export { buildImageRequest };
