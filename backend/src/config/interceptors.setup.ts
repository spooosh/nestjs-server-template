import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


function interceptorsSetup(app) {
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}

export default interceptorsSetup;
