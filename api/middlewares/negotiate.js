import { dump } from 'js-yaml';

const formats = {
    'application/json' : {
        type: 'application/json',
        render: (data) => data
    },
    'text/yaml' : {
        type: 'text/yaml',
        render: (data) => dump(data),
    },
    'application/x-yaml': {
        type: 'text/yaml',
        render: (data) => dump(data)
    }
};

export default function negotiate(req, res, next) {
    const accepted = req.accepts(Object.keys(formats));

    if (!accepted) {
        return res.status(406).send('Not Acceptable: only JSON and YAML supported');
    }

    res.formatView = (data) => {
        res.type(formats[accepted].type);
        res.send(formats[accepted].render(data));
    };

    next();
};