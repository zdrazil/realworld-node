const getSecret = (): string => {
  const secret =
    process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret';

  if (!secret) {
    throw new Error('no secret provided');
  }

  return secret;
};

export const secret: string = getSecret();
