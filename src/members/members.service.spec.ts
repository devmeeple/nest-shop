import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { anything, instance, mock, when } from 'ts-mockito';
import { CreateMemberDto } from './dto/create-member.dto';

describe('MembersService', () => {
  let service: MembersService;
  let mockRepository: Repository<Member>;

  beforeAll(async () => {
    mockRepository = mock(Repository);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: getRepositoryToken(Member),
          useValue: instance(mockRepository),
        },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
  });

  describe('join', () => {
    it('[성공] 회원가입을 성공하면 회원가입한 객체를 전송한다', async () => {
      // Given
      const createMemberDto: CreateMemberDto = { name: 'kim' };
      const member = { id: 1, ...createMemberDto };

      when(mockRepository.save(anything())).thenResolve(member);

      // When
      const actual = await service.join(createMemberDto);

      // Then
      expect(actual).toEqual(member);
    });

    it.todo(
      '[BadRequestException: 이미 존재하는 회원입니다] 이름이 중복되면 에러가 발생한다',
    );

    it.todo('[성공] 전체 회원 조회');
    it.todo('[성공] 회원 단건 조회');
  });
});
