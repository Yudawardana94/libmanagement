import {dateTimeToText} from '../src/helpers';

test('convert date', () => {
  expect(typeof dateTimeToText('2022-12-8T00:00:00')).toBe('string');
  expect(dateTimeToText('2022-12-8T00:00:00')).toBe('2022-12-8');
});
