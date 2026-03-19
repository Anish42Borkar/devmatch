import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      id: randomUUID(),
      name: 'Brianna Watts',
      description: `Looking for someone to merge with my heart. I’m a full-stack romantic who refactors my feelings until they pass all tests. Bonus points if you can debug my issues while we pair program over coffee. Let’s commit to something beautiful together.`,
    },
    {
      id: randomUUID(),
      name: 'Jasper Quinn',
      description: `Seeking a partner in crime to compile my heart. Must be comfortable with the terminal because I only speak fluent bash. Swipe right if you can appreciate a good kernel panic every now and then.`,
    },
    {
      id: randomUUID(),
      name: 'Leo Park',
      description: `You think you know VIM? Try Neovim. I’ll make your modal dreams come true. Want to escape the matrix and explore the perfect keyboard shortcut for love?`,
    },
  ];

  create(createProfileDto: CreateProfileDto) {
    const newProfile = {
      id: randomUUID(),
      name: createProfileDto.name,
      description: createProfileDto.description,
    };
    this.profiles.push(newProfile);
    return {
      data: newProfile,
      message: 'Added successfully',
    };
  }

  findAll() {
    return this.profiles;
  }

  findOne(id: string) {
    const data = this.profiles.find((item) => {
      return item.id === id;
    });
    console.log(data);
    if (!data) return 'No data';
    return data;
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    const obj = this.profiles.find((item) => {
      return item.id === id;
    });

    if (!obj) return 'No user found';

    if (updateProfileDto.name !== undefined) {
      if (!obj) return;
      obj.name = updateProfileDto.name;
    }

    if (updateProfileDto.description !== undefined) {
      if (!obj) return;
      obj.description = updateProfileDto.description;
    }

    // this.profiles.splice(objIndex, 1, obj!);

    return {
      data: obj,
      message: 'Updated successfully',
    };
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
