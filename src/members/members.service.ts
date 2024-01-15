import { BadRequestException, Injectable } from '@nestjs/common';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  /**
   * 회원가입
   * 1) 중복검증: 이름이 중복되면 에러가 발생
   * 2) 엔티티 생성
   * 3) 생성된 엔티티 저장 후 반환
   */
  async join(createMemberDto: CreateMemberDto) {
    await this.validateDuplicateMember(createMemberDto.name);
    const member = this.memberRepository.create(createMemberDto);
    return this.memberRepository.save(member);
  }

  /**
   * 중복 회원 검증
   * 유저이름이 중복되면 에러를 반환한다
   */
  private async validateDuplicateMember(name: string) {
    const findMember = await this.findByName(name);
    // 동시성 문제가 생길 수 있음. 실무에서는 조건(현재는 name)에 유니크 제한 조건을 거는 것을 권장
    if (findMember) {
      throw new BadRequestException('이미 존재하는 회원입니다');
    }
  }

  /**
   * 전체 회원 조회
   */
  async findMembers(): Promise<Member[]> {
    return await this.memberRepository.find();
  }

  /**
   * 단건 조회
   * 요청받은 ID로 해당되는 유저를 조회
   */
  async findOne(memberId: number): Promise<Member> {
    return await this.memberRepository.findOne({ where: { id: memberId } });
  }

  async findByName(name: string) {
    return await this.memberRepository.findOne({ where: { name } });
  }
}
