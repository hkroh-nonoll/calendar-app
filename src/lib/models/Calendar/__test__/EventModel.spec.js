import EventModel from 'lib/models/Calendar/EventModel';
import ExtsDate from 'lib/extensions/ExtsDate';
import { uuidv4 } from 'lib/utils/uuidv4';

function SampleValues() {
  const uuid = uuidv4();
  const startAt = new Date();
  const endAt = ExtsDate.addHour({ date: startAt });
  return {
    uuid,
    title: 'sample 일정 추가',
    startAt,
    endAt
  };
}

describe('# lib/models/Calendar/EventModel Spec Test', () => {

  it('# 생성시 주입한 sample 값과, toModel 값은 같다.', () => {
    const sample = new SampleValues();
    const eventModel = new EventModel(sample);
    expect(eventModel.toModel()).toStrictEqual(sample);
  });

  it('# setTitle 설정시, toModel 의 title 값은 같다.', () => {
    const value = 'setTitle';
    const { title } = new EventModel().setTitle(value).toModel();
    expect(title).toEqual(value);
  });

  it('# setStartAt 설정시, toModel 의 startAt 값은 같다.', () => {
    const value = new Date();
    const { startAt } = new EventModel().setStartAt(value).toModel();
    expect(startAt).toEqual(value);
  });

  it('# setEndAt 설정시, toModel 의 endAt 값은 같다.', () => {
    const value = new Date();
    const { endAt } = new EventModel().setEndAt(value).toModel();
    expect(endAt).toEqual(value);
  });

  it('# validateDiff, startAt 과 endAt 은 1시간 이상 차이가 나야 한다.', () => {
    const successCase = { startAt: new Date(), endAt: ExtsDate.addHour({ date: new Date() }) };
    const isSuccess = new EventModel(successCase).validateDiff();
    expect(isSuccess).toEqual(true);

    const failCase = { startAt: new Date(), endAt: ExtsDate.addHour({ date: new Date(), value: -1 }) };
    const isFail = new EventModel(failCase).validateDiff();
    expect(isFail).toEqual(false);
  });

});
