import React, { useId } from 'react';
import styled from 'styled-components';

import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const [isOpened, setIsOpened] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<React.ReactNode | null>(null);

  const handleRequestToTermDialogOpen = async () => {
    setIsOpened(true);
    const TERM = await fetch('/assets/term.txt').then((response) => response.text());
    setDialogContent(
      <_Content aria-labelledby={termDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={termDialogA11yId} typography={Typography.NORMAL16}>
          利用規約
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {TERM}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToContactDialogOpen = async () => {
    setIsOpened(true);
    const CONTACT = await fetch('/assets/contact.txt').then((response) => response.text());
    setDialogContent(
      <_Content aria-labelledby={contactDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={contactDialogA11yId} typography={Typography.NORMAL16}>
          お問い合わせ
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {CONTACT}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToQuestionDialogOpen = async () => {
    setIsOpened(true);
    const QUESTION = await fetch('/assets/question.txt').then((response) => response.text());
    setDialogContent(
      <_Content aria-labelledby={questionDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={questionDialogA11yId} typography={Typography.NORMAL16}>
          Q&A
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {QUESTION}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToCompanyDialogOpen = async () => {
    setIsOpened(true);
    const COMPANY = await fetch('/assets/company.txt').then((response) => response.text());
    setDialogContent(
      <_Content aria-labelledby={companyDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
          運営会社
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {COMPANY}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToOverviewDialogOpen = async () => {
    setIsOpened(true);
    const OVERVIEW = await fetch('/assets/overview.txt').then((response) => response.text());
    setDialogContent(
      <_Content aria-labelledby={overviewDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={overviewDialogA11yId} typography={Typography.NORMAL16}>
          Cyber TOONとは
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {OVERVIEW}
        </Text>
      </_Content>,
    );
  };

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" height={45} src="/assets/cyber-toon.avif" width={189} />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button disabled={!isClient} onClick={handleRequestToTermDialogOpen}>
            利用規約
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToContactDialogOpen}>
            お問い合わせ
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToQuestionDialogOpen}>
            Q&A
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToCompanyDialogOpen}>
            運営会社
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToOverviewDialogOpen}>
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
      {isOpened && <Dialog content={dialogContent} setIsOpened={setIsOpened} />}
    </Box>
  );
};
